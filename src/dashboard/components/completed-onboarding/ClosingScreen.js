import React from 'react';
import useStyle from './styles';
import logo from '../../../assets/images/logo.svg';

import iOSApp from './assets/iOSApp.svg';
import androidApp from './assets/androidApp.svg';

import google from './assets/footer-icons/google.svg';
import shopify from './assets/footer-icons/shopify.svg';
import facebook from './assets/footer-icons/facebook.svg';
import tikTok from './assets/footer-icons/tikTok.svg';
import linkedIn from './assets/footer-icons/linkedIn.svg';
import wordpress from './assets/footer-icons/wordpress.svg';
import mailchimp from './assets/footer-icons/mailchimp.svg';

function ClosingScreen() {
    const classes = useStyle();
    return (
        <div className={classes.root}>
            <img src={logo} alt="Incard Logo" />
            <h1 className={classes.heading}>Thanks!</h1>
            <p className={classes.nextStep}>Your setup has now been completed and verified.</p>
            <p className={classes.nextStep}>Download the app now to enjoy the all the benefits of being an incard user</p>

            <div className={classes.linksToAppStore}>
                <a href="/">
                    <img src={iOSApp} alt="link to App store" />
                </a>
                <a href="/">
                    <img src={androidApp} alt="Play store" />
                </a>
            </div>
            <p className={`${classes.nextStep} ${classes.detail}`}>
                Faster payments. Higher limits. 24/7 support. Welcome to the world's first payment solution designed exclusively for e-commerce, entrepreneurs, dropshippers and influencers.
            </p>

            <footer>
                <h3 className={classes.footerHeading}>We work across all major ecom platforms</h3>
                <div className={classes.socialIcons}>
                    <div className={classes.icon}>
                        <img src={google} alt="Google logo" />
                    </div>
                    <div className={classes.icon}>
                        <img src={shopify} alt="shopify logo" />
                    </div>
                    <div className={classes.icon}>
                        <img src={facebook} alt="facebook logo" />
                    </div>
                    <div className={classes.icon}>
                        <img src={tikTok} alt="tikTok logo" />
                    </div>
                    <div className={classes.icon}>
                        <img src={linkedIn} alt="linkedIn logo" />
                    </div>
                    <div className={classes.icon}>
                        <img src={wordpress} alt="wordpress logo" />
                    </div>
                    <div className={classes.icon}>
                        <img src={mailchimp} alt="mailchimp logo" />
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default ClosingScreen;
