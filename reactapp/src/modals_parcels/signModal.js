// Import react and react dependencies
import React, {useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom";

// Import style
import '../stylesheets/signModal.css';
import {CloseOutlined, EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";

// Import Redux
import {connect} from "react-redux";

function SignModal(props) {
   // Verify if user is connected
   const [isLogged, setIsLogged] = useState(false);

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

   // Handle Signup
   var handleSignup = async () => {
      if (cgu) {
         let data = await fetch('/users/sign-up', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         body: `firstName=${firstName}&lastName=${lastName}&email=${registerEmailAdress}&password=${registerPassword}`,
      });
         data = await data.json();
         if (data.token) {
            localStorage.setItem('token', data.token)
            props.addToken(data.token);
            setIsLogged(true);
         } else {
            setErrorSignup(<p style={{color: "red"}}>{data.comment}</p>);
         }
      } else {
         setErrorSignup(<p style={{color: "red"}}>Veuillez accepter les CGU</p>);
      }
   };

   // Handle Signin
   var handleSignin = async () => {
      let data = await fetch('/users/sign-in', {
         method: 'POST',
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         body: `email=${loginEmailAdress}&password=${loginPassword}`,
      });
      data = await data.json();
      if (data.token) {
         localStorage.setItem('token', data.token);
         props.addToken(data.token);
         setIsLogged(true);
      } else {
         setErrorSignin(<p style={{color: "red"}}>{data.comment}</p>);
      }
   };

   if (isLogged || localStorage.getItem('token') != null && props.state === 'visible') {
      if (props.navigation.brand != undefined) {
         return <Redirect to={`/sale/${props.navigation.brand}`}/>;
      } else {
         return <Redirect to="/"/>
      }
   } else {
      return (
         <div className="modal" style={{visibility: props.state}}
              onClick={() => props.changeParentState("hidden")}>
            <div className="sign" style={{zIndex: 25}} onClick={e => e.stopPropagation()}>
               <CloseOutlined
                  style={{position: "absolute", right: 3, top: 3, fontSize: "25px", cursor: "pointer"}}
                  onClick={() => props.changeParentState("hidden")}
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
                  <button className="signButton mt buttonHover" onClick={() => handleSignin()}>Se connecter</button>
                  <Link to="/"><p className="forgetPassword">mot de passe oublié ? c’est par ici 👇</p></Link>
                  <h5 className="signTitle mt" style={{marginBottom : 15}}>Ou connectez-vous via : </h5>
                  <img style={{width: "270px", height: "50px", cursor : 'pointer'}} alt="google auth picture"
                       src="/assets/sign_google.png"/>
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
                     <button className="signButton buttonHover" onClick={() => handleSignup()}>S'inscrire</button>
                  </div>
               </div>
            </div>
         </div>
      );
   }

}

function mapStateToProps(state) {
   return {
      token: state.token,
      navigation: state.navigation,
   };
}

function mapDispatchToProps(dispatch) {
   return {
      addToken: function (token) {
         dispatch({type: 'addToken', token: token});
      },
   };
}

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(SignModal);