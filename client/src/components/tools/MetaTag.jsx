import { Helmet } from 'react-helmet';

const MetaTag = props => {
    /*
    REACT HELMET TUTORIAL:
    https://velog.io/@miyoni/noSSRyesSEO
    */

    return (
        <Helmet>
            <title>{props.title}</title>

            <meta name="description" content={props.description} />
            <meta name="keywords" content={props.keywords} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={props.title} />
            <meta property="og:site_name" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:image" content={props.imgsrc} />
            <meta property="og:url" content={props.url} />

            <meta name="twitter:title" content={props.title} />
            <meta name="twitter:description" content={props.description} />
            <meta name="twitter:image" content={props.imgsrc} />

            <link rel="canonical" href={props.url} />
            <link rel="icon" type="image/png" href="%PUBLIC_URL%/favicon.ico" sizes="16x16" />
        </Helmet>
    );
};

export default MetaTag;