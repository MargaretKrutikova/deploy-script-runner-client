import React from 'react';

class AutoCloseAlertComponent extends React.Component {
    fadeTimeouts = [];
    constructor(props){
        super(props);

        this.state = { isVisible: false, fadeClass: "out"};
    }
    _clearTimeouts = () => {
        this.fadeTimeouts.forEach(function(timeout) {
            clearTimeout(timeout);
        }, this);
        this.fadeTimeouts.splice(0, this.fadeTimeouts.length);
    }
    _resetState = () => {
        this.setState({ isVisible: false });
        this._clearTimeouts();
    }
    componentWillReceiveProps(props) {
        if (props.message) {
            this.setState({ isVisible: true, fadeClass: "in" });

            let fadeStartTimeout = setTimeout((function() {
                this.setState({ fadeClass: "out" });
                
                let fadeEndTimeout = setTimeout(this._resetState, 500);
                this.fadeTimeouts.push(fadeEndTimeout);

            }).bind(this), 3000);

            this.fadeTimeouts.push(fadeStartTimeout);
        }
    }
    componentWillUnmount() {
        this._clearTimeouts();
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