import React from 'react';
import '../assets/progressBar.pcss'

const ProgressBar = ({isLoading}) => {
    return <div className={`progress-bar-container ${isLoading ? 'active' : ''}`}>
        <div className="progress-bar"></div>
    </div>
};

export default ProgressBar;