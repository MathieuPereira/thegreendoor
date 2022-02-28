// Import react and react dependencies
import React, {useState} from 'react';

// Import Icon from Ant Design Icon
import {CloseOutlined, EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";

// Import style
import '../stylesheets/signModal.css';
import {connect} from "react-redux";

function SignModal() {
   // Set Modal visible or not
   const [isSignModalVisible, setIsSignModalVisible] = useState('hidden');

   // Inputs
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [registerEmailAdress, setRegisterEmailAdress] = useState('');
   const [registerPassword, setRegisterPassword] = useState('');
   const [loginEmailAdress, setLoginEmailAdress] = useState('');
   const [loginPassword, setLoginPassword] = useState('');
   const [cgu, setCGU] = useState(false);

   // Show or Hide password
   const [isLoginPasswordVisible, setIsLoginPasswordVisible] = useState("password");
   const [iconLogin, setIconLogin] = useState(<EyeOutlined
      className="iconPassword"
      onClick={() => isPasswordVisible('login', 'password')}/>,
   );
   const [isRegisterPasswordVisible, setIsRegisterPasswordVisible] = useState("password");
   const [iconRegister, setIconRegister] = useState(<EyeOutlined
      className="iconPassword"
      onClick={() => isPasswordVisible('register', 'password')}/>,
   );
   // Error handlers
   const [errorSignUp, setErrorSignup] = useState('');
   const [errorSignin, setErrorSignin] = useState('');

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

   var handleSignup = async () => {
      let data = await fetch('/users/sign-up', {
         method: 'POST',
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         body: `firstName=${firstName}&lastName=${lastName}&email=${registerEmailAdress}&password=${registerPassword}`,
      });
      data = await data.json();
      if (data.token) {
         console.log('redirect');
      } else {
         setErrorSignup(<p style={{color: "red"}}>{data.comment}</p>);

      }
   };

   var handleSignin = async () => {
      let data = await fetch('/users/sign-in', {
         method: 'POST',
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         body: `email=${loginEmailAdress}&password=${loginPassword}`,
      });
      data = await data.json();
      if (data.token) {
         console.log('redirect');
      } else {
         setErrorSignin(<p style={{color: "red"}}>{data.comment}</p>);

      }
   };

   return (
      <div className="App">
         <button onClick={() => setIsSignModalVisible('visible')}>Show Modal</button>
         <div className="modal" style={{visibility: isSignModalVisible}}
              onClick={() => setIsSignModalVisible('hidden')}>
            <div className="sign" style={{zIndex: 25}} onClick={e => e.stopPropagation()}>
               <CloseOutlined
                  style={{position: "absolute", right: 3, top: 3, fontSize: "25px", cursor: "pointer"}}
                  onClick={() => setIsSignModalVisible('hidden')}
               />
               <div className="signSection">
                  <h5 className="signTitle">Heureux de vous revoir !</h5>
                  {errorSignin}
                  <form>
                     <input type="text" name="input" placeholder="Votre adresse email"
                            className="" required={true}
                            onChange={(e) => setLoginEmailAdress(e.target.value)} value={loginEmailAdress}/>
                     <div className="passwordDiv">
                        <input type={isLoginPasswordVisible} name="input" placeholder="Créez un mot de passe"
                               className="" required={true}
                               onChange={(e) => setLoginPassword(e.target.value)} value={loginPassword}/>
                        {iconLogin}
                     </div>
                  </form>
                  <button onClick={() => handleSignin()} className="mt">Se connecter</button>
                  <a href=""><p className="forgetPassword">mot de passe oublié ? c’est par ici 👇</p></a>
                  <h5 className="signTitle mt">Ou connectez-vous via : </h5>
                  <img style={{width: "270px", height: "50px"}} alt="google auth picture"
                       src="./googleauthpicture.png"/>
               </div>
               <span className="divider"/>
               <div className="signSection">
                  <h5 className="signTitle">Inscrivez-vous 😊</h5>
                  {errorSignUp}
                  <form>
                     <input type="text" name="input" placeholder="* Votre prénom" className="" required={true}
                            onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
                     <input type="text" name="input" placeholder="* Votre nom" className="" required={true}
                            onChange={(e) => setLastName(e.target.value)} value={lastName}/>
                     <input type="text" name="input" placeholder="* Votre adresse email" className="" required={true}
                            onChange={(e) => setRegisterEmailAdress(e.target.value)} value={registerEmailAdress}/>
                     <div className="passwordDiv">
                        <input type={isRegisterPasswordVisible} name="input" placeholder="* Créez un mot de passe"
                               className="" required={true}
                               onChange={(e) => setRegisterPassword(e.target.value)} value={registerPassword}/>
                        {iconRegister}
                     </div>
                     <div className="raw">
                        <input type="checkbox" name="checkbox" required={true}
                               defaultChecked={cgu} onChange={() => setCGU(!cgu)}/>
                        <label htmlFor="checkbox">J'accepte les Conditions Générales de Vente et la politique de
                           confidentialité </label>
                     </div>
                  </form>
                  <div className="submitRegister">
                     <p>*Champs Requis</p>
                     <button onClick={() => handleSignup()}>S'inscrire</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

function mapDispatchToProps(dispatch) {
   return {
      addToken: function (token) {
         dispatch({type: 'addToken', token: token});
      },
   };
}

export default connect(
   null,
   mapDispatchToProps,
)(SignModal);