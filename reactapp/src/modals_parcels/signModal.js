// Import react and react dependencies
import React from 'react';
import {useState} from "react";

// Import Icon from Ant Design Icon
import {CloseOutlined, EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";

export default function signModal() {
   // * Sign Modal

   // Set Modal visible or not
   const [isSignModalVisible, setIsSignModalVisible] = useState('hidden');

   // Inputs
   const [registerEmailAdress, setRegisterEmailAdress] = useState('');
   const [loginEmailAdress, setLoginEmailAdress] = useState('');
   const [registerPassword, setRegisterPassword] = useState('');
   const [loginPassword, setLoginPassword] = useState('');
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [cgu, setCGU] = useState(false);

   // Show or Hide password
   const [isLoginPasswordVisible, setIsLoginPasswordVisible] = useState("password");
   const [iconLogin, setIconLogin] = useState(<EyeOutlined
      className="iconPassword"
      onClick={() => isPasswordVisible('login', 'password')}/>
   );
   const [isRegisterPasswordVisible, setIsRegisterPasswordVisible] = useState("password");
   const [iconRegister, setIconRegister] = useState(<EyeOutlined
      className="iconPassword"
      onClick={() => isPasswordVisible('register', 'password')}/>
   );

   // Function for set password visible or not
   var isPasswordVisible = (sign, inputType) => {
      if (sign === 'register') {
         if (inputType === 'password') {
            setIsRegisterPasswordVisible('text');
            setIconRegister(<EyeInvisibleOutlined className="iconPassword"
               onClick={() => isPasswordVisible('register', 'text')}/>);
         } else {
            setIsRegisterPasswordVisible("password");
            setIconRegister(<EyeOutlined className="iconPassword"
               onClick={() => isPasswordVisible('register', 'password')}/>);
         }
      } else if (sign === 'login') {
         if (inputType === "password") {
            setIsLoginPasswordVisible("text");
            setIconLogin(<EyeInvisibleOutlined className="iconPassword"
               onClick={() => isPasswordVisible('login', 'text')}/>);
         } else {
            setIsLoginPasswordVisible("password");
            setIconLogin(<EyeOutlined className="iconPassword"
               onClick={() => isPasswordVisible('login', 'password')}/>);
         }
      }
   };

   return (
      <div className="App">
         <button onClick={() => setIsSignModalVisible('visible')}>Show Modal</button>
         <div className="modal" style={{visibility: isSignModalVisible}} onClick={() => setIsSignModalVisible('hidden')}>
            <div className="sign" style={{zIndex: 25}} onClick={e => e.stopPropagation()}>
               <CloseOutlined
                  style={{position: "absolute", right: 3, top: 3, fontSize: "25px", cursor: "pointer"}}
                  onClick={() => setIsSignModalVisible('hidden')}
               />
               <div className="signSection">
                  <h5 className="signTitle">Heureux de vous revoir !</h5>
                  <form>
                     <input type="text" name="input" placeholder="Votre adresse email" className=""
                            onChange={(e) => setLoginEmailAdress(e.target.value)} value={loginEmailAdress}/>
                     <div className="passwordDiv">
                        <input type={isLoginPasswordVisible} name="input" placeholder="Créez un mot de passe"
                               className=""
                               onChange={(e) => setLoginPassword(e.target.value)} value={loginPassword}/>
                        {iconLogin}
                     </div>
                  </form>
                  <button onClick={() => setIsSignModalVisible('hidden')} className="mt">Se connecter</button>
                  <a href=""><p className="forgetPassword">mot de passe oublié ? c’est par ici 👇</p></a>
                  <h5 className="signTitle mt">Ou connectez-vous via : </h5>
                  <img style={{width: "270px", height: "50px"}} alt="google auth picture"
                       src="./googleauthpicture.png"/>
               </div>
               <span className="divider"/>
               <div className="signSection">
                  <h5 className="signTitle">Inscrivez-vous 😊</h5>
                  <form>
                     <input type="text" name="input" placeholder="* Votre prénom" className=""
                            onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
                     <input type="text" name="input" placeholder="* Votre nom" className=""
                            onChange={(e) => setLastName(e.target.value)} value={lastName}/>
                     <input type="text" name="input" placeholder="* Votre adresse email" className=""
                            onChange={(e) => setRegisterEmailAdress(e.target.value)} value={registerEmailAdress}/>
                     <div className="passwordDiv">
                        <input type={isRegisterPasswordVisible} name="input" placeholder="* Créez un mot de passe"
                               className=""
                               onChange={(e) => setRegisterPassword(e.target.value)} value={registerPassword}/>
                        {iconRegister}
                     </div>
                     <div className="raw">
                        <input type="checkbox" name="checkbox"
                               defaultChecked={cgu} onChange={() => setCGU(!cgu)}/>
                        <label htmlFor="checkbox">J'accepte les Conditions Générales de Vente et la politique de
                           confidentialité </label>
                     </div>
                  </form>
                  <div className="submitRegister">
                     <p>*Champs Requis</p>
                     <button onClick={() => setIsSignModalVisible('hidden')}>S'inscrire</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}