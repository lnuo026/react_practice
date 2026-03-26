import * as admin from 'firebase-admin';
// admin.apps 是已初始化的 app列表。
// 这个判断防止重复初始化（被多次 import 时只初始化一次）
if(!admin.apps.length){
    const serviceAccount = require('../../quizapp-guuuuda-firebase-adminsdk-fbsvc-e756c3ba21.json')
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
}

export { admin }