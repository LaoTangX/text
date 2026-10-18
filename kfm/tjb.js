function run () {
    var pvStr = 'jdc2Hkk';
    var endStr = 'jdc2Hkk';
    var data = [];
    var More = configValue ? configValue : 1;

    var taobaoScheme = {
      scheme:"taobao",
      main:"taobao://m.taobao.com/tbopen/index.html?h5Url=https://m.taobao.com",
      start: "taobao://m.tb.cn/h." + pvStr,
      end:"taobao://m.tb.cn/h." + endStr
      
    }
    var schemes = {
      1:[taobaoScheme]
    }
    var scheme = schemes[More]
    var taskList = DATA.activity.taskList


    taskList = taskList.map((v) => DATA.taskData[v]);

    scheme.map((s) => {

      taskList.map((oneTask) => {

        var itme = oneTask.task.item;
        var before = oneTask.task.before;
        var baseUrl = oneTask.task.baseurl
        var wait = oneTask.task.wait
        var paramObj = oneTask.task.param
        //start

        if (s && s.end){
          data.push({
            url:s.end,
            wait:10
          })
        }
        if (s && s.start){
          data.push({
            url:s.start,
            wait:8
          })
        }
        

        //before
        before.map((v,i) => {
          data.push({
            url: s.type ? s.scheme + encodeURIComponent('https' + v.url):s.scheme + v.url,
            wait:v.wait
          })
          
        })
        data.push({
          url:s.main,
          wait:5
        })

        //任务
        itme.map((v,i) => {

          var str = v;
          var params = str.split(' ');
          var url = baseUrl;


          for (var key in paramObj){

            var paramArr = paramObj[key]
            var reg = new RegExp(`${key}`,'g')
            var str = paramArr[Math.floor((Math.random()*paramArr.length))]
            url = url.replace(reg,str);
          }
          //替换参数2
          params.map((v,i) => {
            if (v){
              var num = i+1;
              var reg = new RegExp(`占位参数${num}`,'g')
              url = url.replace(reg,v);
            }
          });

          data.push({
            url:s.type ? s.scheme + encodeURIComponent('https' + url):s.scheme + url,
            wait:wait
          })

          if (i%2 === 0){
            data.push({
              url:s.main,
              wait:5
            })
          }
        })
        if (s && s.end){
          data.push({
            url:s.end,
            wait:5
          })
        }


      })
    })

    if (runNum > 0 && runNum != 1){
      data = data.splice(runNum - 1,data.length);
    }

    var dd = {
      succes: 'ok',
      data:data
    };

    return JSON.stringify(dd);
  };