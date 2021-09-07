import React from 'react';
import Helmet from 'react-helmet';
import { RichText } from 'prismic-reactjs';
import { graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import dimensions from 'styles/dimensions';
import Layout from 'components/Layout';
import ProjectCard from 'components/ProjectCard';

const Hero = styled('div')`
    padding-top: 2.5em;
    max-width: 1000px;
    text-align: justify;

    h1 {
        @media (max-width: ${dimensions.maxwidthMobile}px) {
            font-size: 1.7em;
        }

        a {
            text-decoration: none;
            transition: all 100ms ease-in-out;

            &:nth-of-type(1) {
                color: ${colors.blue500};
            }
            &:nth-of-type(2) {
                color: ${colors.orange500};
            }
            &:nth-of-type(3) {
                color: ${colors.linkedin};
            }
            &:nth-of-type(4) {
                color: ${colors.teal500};
            }

            &:hover {
                cursor: pointer;
                transition: all 100ms ease-in-out;

                &:nth-of-type(1) {
                    color: ${colors.beloit};
                    background-color: ${colors.blue200};
                }
                &:nth-of-type(2) {
                    color: ${colors.orange600};
                    background-color: ${colors.orange200};
                }
                &:nth-of-type(3) {
                    color: ${colors.beloit_light};
                    background-color: ${colors.blue200};
                }
                &:nth-of-type(4) {
                    color: ${colors.teal600};
                    background-color: ${colors.teal200};
                }
            }
        }
    }
`;

const Interested = styled('div')`
    padding-top: 1em;
    padding-bottom: 3em;
    margin-bottom: 6em;
    max-width: 1000px;

    h3 {
        text-align: justify;
        text-justify: auto;
        margin-bottom: 1em;
    }
`;

const Section = styled('div')`
    margin-bottom: 10em;
    display: flex;
    flex-direction: column;

    @media (max-width: ${dimensions.maxwidthTablet}px) {
        margin-bottom: 4em;
    }

    &:last-of-type {
        margin-bottom: 0;
    }
`;

const WorkAction = styled(Link)`
    font-weight: 600;
    text-decoration: none;
    color: currentColor;
    transition: all 150ms ease-in-out;
    margin-left: auto;

    @media (max-width: ${dimensions.maxwidthTablet}px) {
        margin: 0 auto;
    }

    span {
        margin-left: 1em;
        transform: translateX(-8px);
        display: inline-block;
        transition: transform 400ms ease-in-out;
    }

    &:hover {
        color: ${colors.blue500};
        transition: all 150ms ease-in-out;

        span {
            transform: translateX(0px);
            opacity: 1;
            transition: transform 150ms ease-in-out;
        }
    }
`;

const RenderBody = ({ home = {}, projects = [], meta = {} }) => (
    <>
        <Helmet
            title={meta?.title || ''}
            meta={[
                {
                    name: `description`,
                    content: meta?.description || '',
                },
                {
                    property: `og:title`,
                    content: meta?.title || '',
                },
                {
                    property: `og:description`,
                    content: meta?.description || '',
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
                    content: meta?.author || '',
                },
                {
                    name: `twitter:title`,
                    content: meta?.title || '',
                },
                {
                    name: `twitter:description`,
                    content: meta?.description || '',
                },
            ].concat(meta)}
        />
        <Hero>
            <RichText render={home?.about || ''} />
        </Hero>
        <Interested>
            <RichText render={home?.interested || ''} />
        </Interested>
        <Section>
            {projects.map((project, i) => (
                <ProjectCard
                    key={i}
                    category={project.node.project_category}
                    title={project.node.project_title}
                    description={project.node.project_preview_description}
                    thumbnail={project.node.project_preview_thumbnail}
                    uid={project.node._meta.uid}
                />
            ))}
            <WorkAction to={'/project'}>
                See more projects <span>&#8594;</span>
            </WorkAction>
        </Section>
    </>
);

export default ({ data }) => {
    //Required check for no data being returned
    const doc = data.prismic.allHomepages.edges.slice(0, 1).pop();
    const projects = data.prismic.allProjects.edges;
    const meta = data.site.siteMetadata;

    console.log(doc.node);

    if (!doc || !projects) return null;

    return (
        <Layout>
            <RenderBody home={doc.node} projects={projects} meta={meta} />
        </Layout>
    );
};

export const query = graphql`
    {
        prismic {
            allHomepages {
                edges {
                    node {
                        about
                        contact
                        interested
                    }
                }
            }
            allProjects(uid: "brats2020") {
                edges {
                    node {
                        project_title
                        project_preview_description
                        project_preview_thumbnail
                        project_category
                        project_post_date
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
