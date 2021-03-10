import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import i18n from '../i18n';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};



const CategoriesInput = (props) => {
  if(!props.categories || props.categories.length === 0)
      return null;
  const displayForLanguage = (category) => {
    if(category.translations === undefined){
      category = props.categories.filter(item => item.id === category)[0];
    }
    if(i18n.language !== 'en' && category.translations.length > 0){
      for(let i=0; i < category.translations.length; i++ ){
        if(category.translations[i].language === i18n.language && category.translations[i].text){
          let nameText = category.translations[i].text;
          return nameText[0].toUpperCase() + nameText.substr(1);
        }
      }
    }
    return category.name[0].toUpperCase() + category.name.substr(1);
  };
  
  return (
    <FormControl fullWidth variant="outlined" error={props.touched[props.name] && Boolean(props.errors[props.name])}>
      <InputLabel id={`${props.name}-select-label`}>{props.label}</InputLabel>
      <Select
        labelId={`${props.name}-select-label`} 
        fullWidth
        multiple
        value={props.values[props.name]} 
        onChange={props.handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => selected.map(item => displayForLanguage(item)).join(', ')}
        MenuProps={MenuProps}
        onBlur={props.handleBlur}
        name={props.name}
        id={props.name}
        label={props.label}
      >
        {props.categories.map((category) => (
          <MenuItem key={category.name} value={category.id}>
            <Checkbox color="primary" checked={props.values.categories.map(category => category).indexOf(category.id) > -1} />
            <ListItemText primary={displayForLanguage(category)} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

};

export default CategoriesInput;