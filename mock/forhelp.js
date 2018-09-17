import moment from 'moment'
import Mock from 'mockjs'
import { parse } from 'url'

const Random = Mock.Random
const getForHelpData = (req, res, u) => {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }
    const params = parse(url, true).query;
    console.log(params)
    let radioTime = params.radioTime
    let compare = params.compare && params.compare
    let helpNum = []
    let compareDatas = []
    if(compare){
        if (radioTime === '1') {
            let data = getData(params.endDate)
            let compareData = getData(params.compareEndData)
            helpNum.push(data)
            compareDatas.push(compareData)
        } else {
            let startDate = moment(params.startDate)
            let endDate = moment(params.endDate)
            let compareStartDate = moment(params.compareStartDate)
            let compareEndDate = moment(params.compareEndDate)
            let newDate = startDate
            let compareNewDate = compareStartDate
            while(newDate < endDate){
                helpNum.push(getData(moment(newDate).format('YYYY-MM-DD')))
                newDate += 1000 * 60 * 60 * 24
            }
            while (compareNewDate < compareEndDate) {
              compareDatas.push(getData(moment(compareNewDate).format('YYYY-MM-DD')))
              compareNewDate += 1000 * 60 * 60 * 24
            }

        }
    }else{
        if (radioTime === '1') {
            let data = getData(params.endDate)
            helpNum.push(data)
        } else {
            let startDate = moment(params.startDate)
            let endDate = moment(params.endDate)
            let newDate = startDate
            while(newDate < endDate){
                helpNum.push(getData(moment(newDate).format('YYYY-MM-DD')))
                newDate += 1000 * 60 * 60 * 24
            }

        }
    }
    
    return res.json({
        data: helpNum,
        compareData: compareDatas
    })
}

const getData = (date) => {
    let data = Mock.mock({
      id: Random.guid(), //id
      'studentForHelpNum|200-3500': 120, //学生求助数
      'teacherForHelpNum|200-3000': 100, //外教求助数
      'classesNum|3001-3500': 200 //课堂总数
    })
    data['date'] = date //moment(new Date(today - 1000 * 60 * 60 * 24 * i).getTime()).format('YYYY-MM-DD')
    return data
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

const studentForProblemType = (req, res) => {
    let problems = []
    for(let i = 0; i < 4 ;++i){
        let data = Mock.mock({
            id: Random.guid(), //id
            'penNofind|1000-3000':2,  //无法使用画笔
            'classNoshow|1000-3000':2,  //无法显示课件
            'screenBlur|1000-3000':2,  //画面模糊
        })
        problems.push(data)   
    } 
    console.log(problems)
    return res.json(problems)
}
    
export default {
    'GET /api/fetch_forhelp_data': getForHelpData,
    'GET /api/fetch_problem_classes_data': getProblemClassesData,
    'GET /api/fetch_type_student_forProblems_data': studentForProblemType,
}