import * as admin from 'firebase-admin';
// admin.apps 是已初始化的 app列表。
// 这个判断防止重复初始化（被多次 import 时只初始化一次）
if(!admin.apps.length){
    admin.initializeApp({
        // 用服务器默认凭证认证（本地开发环境需要设置   
        credential:admin.credential.applicationDefault(),
        projectId:process.env.FIREBASE_PROJECT_ID, 
    })
}

export { admin }