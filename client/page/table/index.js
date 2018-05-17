
import React from 'react';
import {connect} from 'react-redux';

class Table extends React.Component {
    render() {
        return (
            <div>
               table
            </div>
        );
    }
}

// export default Table
export default connect()(Table);