import  Mcom from '../components/Mcom';
import CheckBox from '../components/ToggleBtn.js'
export default (props) => (
    <div>
        <h1>This is about page</h1>
        <CheckBox name="数量" isOn={false} ToggleHandler={name=>console.log(name)}/>
    </div>
)

