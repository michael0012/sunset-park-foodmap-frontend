import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Route, Switch, useLocation } from "react-router-dom";
import i18n, { LANGUAGES } from './i18n'; // correct import statement for i18n
import SelectLang from './components/SelectLang';
import { SET_LANG } from './reducers/language';
import NotFound from './screens/NotFound';
import MapScreen from './screens/MapScreen';
import AddRestaurantScreen from './screens/AddRestaurantScreen';



const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      setLang: (lang) =>  dispatch({
          type: SET_LANG,
          language: lang,
      }),
  };
}


let LoggedInRoutes = (props) => {
    const location = useLocation();
    const lang = location.pathname.split('/')[1];
    const [state, setState] = useState({selectingLang: false,});
    useEffect(() => {
      if(!LANGUAGES.includes(lang) || !props.selected){
        setState(state => ({...state, selectingLang: true}));
      }else{
        setState(state => ({...state, selectingLang: false}));
      }
      if( LANGUAGES.includes(lang) && props.language !== lang ){
        props.setLang(lang);
      }
      if( LANGUAGES.includes(lang) && i18n.language !== lang ){
        i18n.changeLanguage(lang);
      }
      
    },[props, lang]);
  
    return (
      <React.Fragment>
        {state.selectingLang && <SelectLang/>}
        <Switch>
          <Route exact path="/" component={AddRestaurantScreen}/>
          <Route exact path="/:lang([a-z]{2})/" component={AddRestaurantScreen}/>
          {
              // the two routes above should have the same component
              // the routes below must have paths that start with /:lang([a-z]{2})/ inorder for template to work.
          }
          <Route exact path="/:lang([a-z]{2})/foodmap" component={MapScreen} />
          {
            // 404 error page below
          }
          <Route component={NotFound}/>
        </Switch>
      </React.Fragment>
    );
    
  };
  const mapStateToProps = state => ({ language: state.language.language, selected: state.language.selected })
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoggedInRoutes);