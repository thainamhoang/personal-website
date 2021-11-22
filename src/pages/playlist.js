import React from 'react';
import Helmet from 'react-helmet';
import { RichText } from 'prismic-reactjs';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from 'components/Layout';
import colors from 'styles/colors';
import dimensions from 'styles/dimensions';
import { dateConverter } from 'utils';

const PlaylistTitle = styled('h1')`
    margin-bottom: 1em;
`;

const ListContainer = styled('div')``;

const Preface = styled('div')`
    padding-top: 1em;
    margin-bottom: 4em;

    @media (max-width: ${dimensions.maxwidthMobile}px) {
        margin-bottom: 3em;
    }

    h3 {
        margin-bottom: 1em;
        text-align: justify;
        text-justify: auto;

        a {
            text-decoration: none;
            transition: all 100ms ease-in-out;
            color: ${colors.purple500};

            &:hover {
                cursor: pointer;
                transition: all 100ms ease-in-out;
                color: ${colors.purple600};
                background-color: ${colors.purple200};
            }
        }
    }
`;

const UnorderedList = styled('ul')`
    padding-left: 0em;
    margin-left: 0em;

    li {
        padding-left: 0em;
        margin-left: -0.75em;
        font-size: 1.25em;

        a {
            text-decoration: none;
            color: ${colors.purple600};
            transition: all 150ms ease-in-out;

            &:hover {
                color: ${colors.purple700};
            }
        }
    }
`;

const Playlist = ({ list, meta }) => {
    const { description, author, title } = meta || {};
    const { preface, update_time, playlist } = list || {};

    return (
        <>
            <Helmet
                title={`Playlist | Thai-Nam Hoang`}
                meta={[
                    {
                        name: `description`,
                        content: description,
                    },
                    {
                        property: `og:title`,
                        content: `Playlist | Thai-Nam Hoang`,
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
                <PlaylistTitle>Playlist</PlaylistTitle>
                <ListContainer>
                    <Preface>
                        <RichText render={preface} />
                        <h4>{`Last update: ${dateConverter(update_time)}`}</h4>
                    </Preface>
                    <UnorderedList>
                        <RichText render={playlist} />
                    </UnorderedList>
                </ListContainer>
            </Layout>
        </>
    );
};
export default ({ data }) => {
    const list = data.prismic.allPlaylists.edges[0];
    const meta = data.site.siteMetadata;

    if (!list) return null;

    return <Playlist list={list.node} meta={meta} />;
};

export const query = graphql`
    {
        prismic {
            allPlaylists {
                edges {
                    node {
                        preface
                        update_time
                        playlist
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
