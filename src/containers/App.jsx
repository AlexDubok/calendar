import React  from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import LayoutContainer from './LayoutContainer.jsx';

export default function App() {
    return (
        <Router>
            <div>
                <Route path='/' component={LayoutContainer} />
            </div>
        </Router>
    );
}
