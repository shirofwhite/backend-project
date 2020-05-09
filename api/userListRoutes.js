'use strict'
module.exports = function(app){
    var userList = require('./userListController')

    app.route('/auth/:userID/:passWord')
        .get(userList.listAllAccounts)
    
    app.route('/mainpage/m/:staffID')
        .get(userList.listAllDataMobile)

    app.route('/information/m/newdata/add')
        .post(userList.CreateADataMobile)

    app.route('/map/getAllMap')
        .get(userList.listAllMap)

    app.route('/map/getSomeMap/:districtID')
        .get(userList.listSomeMap)

    app.route('/dashboard/getDashMostPrice')
        .get(userList.listDashMostPrice)

    app.route('/dashboard/getDashDist')
        .get(userList.listDashDist)

    app.route('/dashboard/getDashPos')
        .get(userList.listDashPos)
    
    app.route('/dashboard/getDashView')
        .get(userList.listDashView)

    app.route('/dashboard/getDashPrice')
        .get(userList.listDashPrice)

    app.route('/dashboard/getDashType')
        .get(userList.listDashType)

    app.route('/dashboard/getDashSubMostPrice/:districtName')
        .get(userList.listDashSubMostPrice)

    app.route('/dashboard/getSubDashSubdist/:districtName')
        .get(userList.listSubDashSubdist)

    app.route('/dashboard/getDashSubPos/:districtName')
        .get(userList.listDashSubPos)

    app.route('/dashboard/getDashSubView/:districtName')
        .get(userList.listDashSubView)

    app.route('/dashboard/getDashSubPrice/:districtName')
        .get(userList.listDashSubPrice)
    
    app.route('/dashboard/getDashSubType/:districtName')
        .get(userList.listDashSubType)

    app.route('/repositories/getAllData')
        .get(userList.listAllData)
    
    // app.route('/repositories/delete')
    //     .delete(userList.deleteAData)
    
    app.route('/information/getSomeData/:projectName')
        .get(userList.listSomeData)
    
    // app.route('/information/getSomeDist')
    //     .get(userList.listSomeDist)


    app.route('/information/update/:projectID')
        .post(userList.updateAData)

}