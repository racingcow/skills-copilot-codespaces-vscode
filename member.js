function skillsMember() {
    var member = {
        name: 'John',
        age: 20,
        skills: ['JS', 'CSS', 'HTML'],
        wife: null
    };
    var memberJSON = JSON.stringify(member);
    console.log(memberJSON);
}