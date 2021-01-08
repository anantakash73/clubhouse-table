var express = require('express');
var router = express.Router();
var axios = require('axios')



async function getMemberNames() {
    let members = {}
        const name = await axios.get("https://api.clubhouse.io/api/v3/members", {
            headers: {
                'Clubhouse-Token': process.env.CLUBHOUSE_API_TOKEN
            }
        }).then(response => {
            response.data.forEach(member => {
                members[member.id] = member.profile.name
            })
        })
        return members
}

async function getTeam(){
    let teams = {}
    const names = await axios.get("https://api.clubhouse.io/api/v3/teams", {
        headers: {
            'Clubhouse-Token': process.env.CLUBHOUSE_API_TOKEN
        }
    }).then(response => {
        response.data.forEach(team => {
            teams[team.id] = team.name
        })
    })
    return teams
}

router.get('/', async function(req, res, next) {

    const projects = await axios.get("https://api.clubhouse.io/api/v3/projects", {
        headers: {
            'Clubhouse-Token': process.env.CLUBHOUSE_API_TOKEN
        }
    }).then(response => response.data)
    let result = []
    const teams = await getTeam()
    const members = await getMemberNames()
    for (const project of projects) {
        const memberNames = project.follower_ids.map(id => members[id])
        let namesString = ""
        memberNames.map((name, index) => {
            namesString += (index +1) + ". " + name + "\n"
        });
        const teamName = teams[project.team_id]
        result.push({
            "name" : project.name || "",
            "team" : teamName,
            "stories" : project.stats.num_stories || "",
            "followers" : project.follower_ids.length,
            "names" : namesString,
            "active" : ((project.archived === false) ? "✅" : "❌") || "",
        })

        }

    res.json(result)
})
module.exports = router;
