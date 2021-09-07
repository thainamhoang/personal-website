import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from 'components/Layout';
import ProjectCard from 'components/ProjectCard';

const ProjectTitle = styled('h1')`
    margin-bottom: 1em;
`;

const Project = ({ projects = [], meta }) => (
    <>
        <Helmet
            title={`Project | Thai-Nam Hoang`}
            meta={[
                {
                    name: `description`,
                    content: meta?.description || '',
                },
                {
                    property: `og:title`,
                    content: `Project `,
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
        <Layout>
            <ProjectTitle>Project</ProjectTitle>
            <>
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
            </>
        </Layout>
    </>
);

export default ({ data }) => {
    const projects = data.prismic.allProjects.edges;
    const meta = data.site.siteMetadata;
    if (!projects) return null;

    return <Project projects={projects} meta={meta} />;
};

export const query = graphql`
    {
        prismic {
            allProjects {
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
