import moment from 'moment'
import Mock from 'mockjs'

const Random = Mock.Random
const getForHelpData = (req, res) => {
    let helpNum = []
    let today = new Date().getTime()
    for(let i = 0;i <= 30; i++){
        let data = Mock.mock({
            id:Random.guid(), //id
            'studentForHelpNum|200-3500':120, //学生求助数
            'teacherForHelpNum|200-3500':100, //外教求助数
            'classesNum|3000-3500':200   //课堂总数
        })
        data['date'] = moment(new Date(today - 1000 * 60 * 60 * 24 * i).getTime()).format('YYYY-MM-DD')
        helpNum.push(data)
    }
    return res.json(helpNum)
}

const getProblemClassesData = (req, res) => {
    let classes = []
    let today = new Date().getTime()
    for (let i = 0; i <= 30; i++) {
      let data = Mock.mock({
        id: Random.guid(), //id
        'classesNum|3000-3500': 200, //课堂总数
        'problemClassesNum|200-3500':200 //影响课堂数
      })
      data['date'] = moment(new Date(today - 1000 * 60 * 60 * 24 * i).getTime()).format('YYYY-MM-DD')
      classes.push(data)
    }
    return res.json(classes)
}
    
export default {
    'GET /api/fetch_forhelp_data': getForHelpData,
    'GET /api/fetch_problem_classes_data': getProblemClassesData,
}