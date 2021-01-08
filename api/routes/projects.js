var express = require('express');
var router = express.Router();
var axios = require('axios')



async function getMembers(listId) {
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
        return listId.map(id => members[id])
}

async function getTeam(teamId){
    let teams = {}
    const name = await axios.get("https://api.clubhouse.io/api/v3/teams", {
        headers: {
            'Clubhouse-Token': process.env.CLUBHOUSE_API_TOKEN
        }
    }).then(response => {
        response.data.forEach(team => {
            teams[team.id] = team.name
        })
    })
    return teams[teamId]
}

router.get('/', async function(req, res, next) {

    const projects = await axios.get("https://api.clubhouse.io/api/v3/projects", {
        headers: {
            'Clubhouse-Token': process.env.CLUBHOUSE_API_TOKEN
        }
    }).then(response => response.data)
    let result = []
    for (const project of projects) {
        const names = await getMembers(project.follower_ids)
        let namesString = ""
        names.map((name, index) => {
            namesString += (index +1) + ". " + name + "\n"
        });
        const team = await getTeam(project.team_id)
        result.push({
            "name" : project.name || "",
            "team" : team,
            "stories" : project.stats.num_stories || "",
            "followers" : project.follower_ids.length,
            "names" : namesString,
            "active" : ((project.archived === false) ? "✅" : "❌") || "",
        })

        }

    res.json(result)
})
module.exports = router;
