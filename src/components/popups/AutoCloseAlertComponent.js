import React from 'react';

class AutoCloseAlertComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = { isVisible: false, fadeClass: "out"};
    }
    _resetState = () => {
        this.setState({ isVisible: false });
    }
    componentWillReceiveProps(props) {
        if (props.message) {
            this.setState({ isVisible: true, fadeClass: "in" });

            setTimeout((function() {
                this.setState({ fadeClass: "out" });
                setTimeout(this._resetState, 500);

            }).bind(this), 3000);
        }
    }
    render() {
        let alert = <div></div>;
        if (this.state.isVisible) {
            alert = 
                <div className={`alert alert-${this.props.type} fade ${this.state.fadeClass}`} role="alert">
                    {this.props.message}
                </div>;
        }
        return (alert);
    }
}

export default AutoCloseAlertComponent;