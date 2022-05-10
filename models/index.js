const Volunteer = require("./Volunteer");
const Opportunity = require("./Opportunity");

Volunteer.hasMany(Opportunity,{
    as:"Creator"
});
Opportunity.belongsTo(Volunteer, {
    as:"Creator"
});

Volunteer.belongsToMany(Opportunity,{
    through:"VolunteersOpportunities",
    as:"Attendee"
})
Opportunity.belongsToMany(Volunteer,{
    through:"VolunteersOpportunities",
    as:"Attendee"
})



module.exports = {
    Volunteer,
    Opportunity,
}