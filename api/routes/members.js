var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET users listing. */
router.get('/', async function(req, res, next) {

    const members = await axios.get("https://api.clubhouse.io/api/v3/members", {
        headers: {
            'Clubhouse-Token': process.env.CLUBHOUSE_API_TOKEN
        }
    }).then(response => response.data)

    const result = members.map(member => {
        return ({
            "name": member.profile.name || "",
            "email": member.profile.email_address || "",
            "username": member.profile.mention_name || "",
            "admin": ((member.role === "admin") ? "✅" : "❌") || "",
            "active": ((member.profile.deactivated === false) ? "✅" : "❌") || "",
            "2fa": ((member.profile.two_factor_authentication === true) ? "✅" : "❌") || "",
            "image": member.profile.display_icon && member.profile.display_icon.url ? member.profile.display_icon.url : "none"
        })
    })
    res.json(result)
})

module.exports = router;
