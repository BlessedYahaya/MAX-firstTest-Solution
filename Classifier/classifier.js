/**
 * Function For main program.
 */


function classifier(input){
    
    if(input.constructor === Array){                    //check if input is an array
        let age=DobToAge(input);
        let sorted_ages =  age.sort(compare);
        let answer = groupAges(sorted_ages);
        return Output(answer);
    }
    else{
        throw TypeError;
    }
}

/**
 * Function for Output.
 */

function Output(result){
    let formatted = {
        noOfGroups: result.length,
    };
    result.forEach(function(res,index) {
        formatted['group'+(index+1)] = res;
    });
    return formatted;
}

/**
 * Function to Group Ages.
 */

function groupAges(input){
    let groups = [];
    input.forEach(function(one) {
        let last_group = groups[groups.length - 1];
        let is_new_group = true;
        if(last_group){
            if(Object.keys(last_group.members).length < 3){
                let pass_age_differene = true;
                last_group.members.forEach(function(member) {
                    if((one.age - member.age) > 5){
                        pass_age_differene = false;
                    }
                });
                if(pass_age_differene){
                    last_group.members.push(memberObject(one));
                    last_group.oldest = one.age;
                    last_group.sum += one.age;
                    last_group.regNos.push(parseInt(one.regNo));
                    last_group.regNos=last_group.regNos.sort((a, b) => a - b);
                    groups[groups.length - 1] = last_group;
                    is_new_group = false;
                }
            }
        }
        if(is_new_group){
            last_group = {
                members:[memberObject(one)],
                oldest:one.age,
                sum:one.age,
                regNos: [parseInt(one.regNo)]
            }
            groups.push(last_group);
        }
    });
    return groups;
}

function memberObject(one){
    return {name: one.name, age: one.age};
}


/**
 * funtion to convert dob to Age.
 */
function DobToAge(data){
    let values = [];
    data.forEach(function(element) {
        var now=new Date();
        var date=new Date(element.dob);
        var age_period=((now.getMonth()<date.getMonth()) ? 1 : ((now.getMonth()== date.getMonth() && now.getDate()<date.getDate()) ? 1 : 0))
        element.age = Math.floor(now.getFullYear() -(date).getFullYear() -age_period);
        values.push(element);
    });
    return values;
}

/**
 * Function to sort by Age.
 */

function compare(a, b) {
    
    const ageA = a.age;
    const ageB = b.age;
    return ((ageA < ageB) ? -1 : ((ageA > ageB) ? 1 : 0));
}


module.exports=classifier; //export program main function