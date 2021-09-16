import React from 'react';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import dimensions from 'styles/dimensions';
import { Link, graphql } from 'gatsby';
import { RichText } from 'prismic-reactjs';
import Layout from 'components/Layout';

const ProjectHeroContainer = styled('div')`
    background: ${colors.grey200};
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
    position: relative;
    padding-top: 2.25em;
    margin-bottom: 3.5em;

    img {
        max-width: 600px;
    }
`;

const ProjectTitle = styled('div')`
    max-width: 830px;
    margin: 0 auto;
    text-align: center;
`;

const ProjectBody = styled('div')`
    max-width: 830px;
    margin: 0 auto;

    a {
        color: ${colors.blue600};
        font-weight: bold;
        text-decoration: none;
        border-bottom: 1px solid transparent;
        transition: all 200ms ease-in-out;

        &:hover {
            border-color: ${colors.blue400};
        }
    }

    .block-img {
        margin-top: 3.5em;
        margin-bottom: 0.5em;

        img {
            width: 100%;
        }
    }
`;

const WorkLink = styled(Link)`
    margin-top: 3em;
    display: block;
    text-align: center;
`;

const Button = styled('button')`
    padding: 0.95em 1.8em;
    background: ${colors.blue200};
    font-weight: 600;
    color: ${colors.blue600};
    outline: none;
    border: none;
    font-size: 0.95rem;
    border-radius: 2px;
    position: relative;
    transition: background 100ms ease-in-out;

    @media (max-width: ${dimensions.maxwidthMobile}px) {
        padding: 0.8em 1.8em;
        font-size: 1em;
    }

    &:hover {
        cursor: pointer;
        background: ${colors.blue300};
        transition: background 100ms ease-in-out;
    }
`;

const Project = ({ project, meta }) => {
    const { description, author, title } = meta || {};
    const { project_title, project_hero_image, project_description } =
        project || {};

    return (
        <>
            <Helmet
                title={`${project_title[0].text}`}
                titleTemplate={`%s | ${title}`}
                meta={[
                    {
                        name: `description`,
                        content: description,
                    },
                    {
                        property: `og:title`,
                        content: `${project_title[0].text}`,
                    },
                    {
                        property: `og:description`,
                        content: description,
                    },
                    {
                        property: `og:type`,
                        content: `website`,
                    },
                    {
                        name: `twitter:card`,
                        content: `summary`,
                    },
                    {
                        name: `twitter:creator`,
                        content: author,
                    },
                    {
                        name: `twitter:title`,
                        content: title,
                    },
                    {
                        name: `twitter:description`,
                        content: description,
                    },
                ].concat(meta)}
            />
            <Layout>
                <ProjectTitle>
                    <RichText render={project_title} />
                </ProjectTitle>
                {project_hero_image && (
                    <ProjectHeroContainer>
                        <img src={project_hero_image.url} alt="bees" />
                    </ProjectHeroContainer>
                )}
                <ProjectBody>
                    <RichText render={project_description} />
                </ProjectBody>
                <WorkLink to={'/project'}>
                    <Button>See other work</Button>
                </WorkLink>
            </Layout>
        </>
    );
};

export default ({ data }) => {
    const projectContent = data.prismic.allProjects.edges[0].node;
    const meta = data.site.siteMetadata;
    return <Project project={projectContent} meta={meta} />;
};

export const query = graphql`
    query ProjectQuery($uid: String) {
        prismic {
            allProjects(uid: $uid) {
                edges {
                    node {
                        project_title
                        project_preview_description
                        project_preview_thumbnail
                        project_category
                        project_post_date
                        project_hero_image
                        project_description
                        _meta {
                            uid
                        }
                    }
                }
            }
        }
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`;
