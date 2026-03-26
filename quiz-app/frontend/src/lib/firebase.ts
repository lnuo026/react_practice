  import { initializeApp } from 'firebase/app'              
  import { getAuth, GoogleAuthProvider } from               
  'firebase/auth'                                           
                                                        
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,          
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,    
    storageBucket:                                      
  import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:                                      
  import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,            
  }                                                     

  
// 1. 用 .env 里的配置，启动 Firebase 连接                
  export const app = initializeApp(firebaseConfig)          
                                                            
  // 2. 拿到"认证工具"（负责登录/登出）                     
  export const auth = getAuth(app)                          
                                                            
  // 3. 拿到"Google登录提供者"（告诉 Firebase 用 Google 方式登录）                                            
  export const googleProvider = new GoogleAuthProvider()    
                                                        
  