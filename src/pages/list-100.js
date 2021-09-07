import React from 'react';
import Helmet from 'react-helmet';
import { RichText } from 'prismic-reactjs';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from 'components/Layout';
import colors from 'styles/colors';
import dimensions from 'styles/dimensions';
import { dateConverter } from 'utils';

const List100Title = styled('h1')`
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

const OrderedList = styled('ol')`
    padding-left: 0em;
    margin-left: 0em;

    li {
        padding-left: 0em;
        margin-left: -0.75em;
        font-size: 1.25em;
    }
`;

const List100 = ({ list, meta }) => (
    <>
        <Helmet
            title={`List 100 | Thai-Nam Hoang`}
            meta={[
                {
                    name: `description`,
                    content: meta?.description || '',
                },
                {
                    property: `og:title`,
                    content: `List100 | Prist, Gatsby & Prismic Starter`,
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
            <List100Title>List 100</List100Title>
            <ListContainer>
                <Preface>
                    <RichText render={list?.preface} />
                    <h4>{`Last update: ${dateConverter(
                        list?.update_time
                    )}`}</h4>
                </Preface>
                <OrderedList>
                    <RichText render={list?.list_100} />
                </OrderedList>
            </ListContainer>
        </Layout>
    </>
);

export default ({ data }) => {
    const list = data.prismic.allList_100s.edges[0];
    const meta = data.site.siteMetadata;

    console.log(list);
    if (!list) return null;

    return <List100 list={list.node} meta={meta} />;
};

export const query = graphql`
    {
        prismic {
            allList_100s {
                edges {
                    node {
                        preface
                        update_time
                        list_100
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
