var express = require('express');
var bodyParser = require('body-parser');

var infoRouter = express.Router();
var Verify = require('./verify');
infoRouter.use(bodyParser.json());

function mapProgramme(x){
  switch(x){
    case '077':
    case '031': return 'IT';
    case '027': return 'CSE';
    case '028': return 'ECE';
    case '036': return 'MAE';
    case '049': return 'EEE';
    case '034': return 'CE';
    case '111': return 'ME';
    case '030': return 'ICE';
    case '112': return 'MTE';
    case '110': return 'EE';
    case '037': return 'PE';
    case '056': return 'ENVE';
    case '086': return 'TE';
    default: return 'Not found';
  }
}
function mapSem(x){
  switch(x){
    case '17': return 1;
    case '16': return 3;
    case '15': return 5;
    case '14': return 7;
    default: return 0;
  }
}
infoRouter.route('/:roll')
.get(Verify.verifyAppUser,function (req, res, next) {
    let branch = mapProgramme(req.params.roll.substring(6,9));
    let sem = mapSem(req.params.roll.substring(9,11));
    res.json({branch,sem});
});
module.exports = infoRouter;