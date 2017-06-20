var React         = require('react');
var PropTypes     = require('prop-types');

function SelectLanguage(props) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className="languages">
      {languages.map( (lang) => (
        <li 
          key={lang}
          style={ lang === props.selectedLanguage ? { color: '#d0021b' }  : null }
          onClick={ () => props.onSelect(lang) }>
          {lang}
        </li>
        )
      )}
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage  : PropTypes.string.isRequired
, onSelect          : PropTypes.func.isRequired
}

module.exports = SelectLanguage;