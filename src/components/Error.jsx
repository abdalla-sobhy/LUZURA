import React from "react";

class Error extends React.Component {
    render() {
        return (
            <>
                <li className="text-danger">{this.props.message}</li>
            </>
        );
    }
}

export default Error;