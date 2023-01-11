'use client';

// Chakra UI関連
import { Box, Link, UnorderedList, ListItem, AspectRatio, Text, Heading } from '@chakra-ui/react';
import { SimpleGrid, Card, CardHeader, CardBody, CardFooter, Button } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

// その他
import Title from '../common/item-title';

const Home = () => {
  return (
    <>
      <Box p="16px">
        {info()}
        <Box mb={8} />

        {explanation()}
        <Box mb={8} />

        {access()}
        <Box mb={8} />

        {links()}
        <Box mb={8} />

        {/* <Title title="更新情報" /> */}
      </Box>
    </>
  );
};
export default Home;

const info = () => {
  return (
    <>
      <Box>
        <Title title="エレガンス学院-非公式について" />
        <Box>
          <Text>
            当サイトは、川崎・堀之内にあるソープランド、エレガンス学院の出勤情報等をまとめた非公式サイトです。
            <br />
            <br /> 「出勤通知、統計情報、口コミ」機能をご利用いただけますので、ぜひご活用ください。
          </Text>
        </Box>
      </Box>
    </>
  );
};

const explanation = () => {
  return (
    <>
      <Box>
        <Title title="使い方" />
        <Box>
          <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
            <Card>
              <CardHeader>
                <Heading size="md"> 出勤通知</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  お気に入りの生徒を通知登録することで、Twitterにて常に最新の出勤情報が通知されます。
                  <br />
                  <br />
                  注意点：Twitterへのログインが必要となります。
                </Text>
              </CardBody>
              <CardFooter>
                <Link href="/notification">
                  <Button colorScheme="teal">始める</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Heading size="md"> 統計</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  過去の出勤データを確認することができます。
                  <br />
                  出勤データは、店舗全体、生徒別 それぞれ確認できます。
                  <br />
                  <br />
                  注意点：2022/12/20 以前のデータは確認できません。
                </Text>
              </CardBody>
              <CardFooter>
                <Link href="/statistics">
                  <Button colorScheme="teal">始める</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Heading size="md"> 口コミ</Heading>
              </CardHeader>
              <CardBody>
                <Text>生徒の口コミを閲覧・投稿することができます。</Text>
              </CardBody>
              <CardFooter>
                <Link href="/review">
                  <Button colorScheme="teal">始める</Button>
                </Link>
              </CardFooter>
            </Card>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};

const access = () => {
  return (
    <>
      <Box>
        <Title title="アクセス" />
        <Card>
          <CardBody>
            <AspectRatio ratio={16 / 16}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3246.8120276037002!2d139.70369761559508!3d35.53364258022893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018609604c2d57d%3A0x1f4c0cfdc5646c91!2z44CSMjEwLTAwMDMg56We5aWI5bed55yM5bed5bSO5biC5bed5bSO5Yy65aCA5LmL5YaF55S677yX4oiS77yY!5e0!3m2!1sja!2sjp!4v1672430458804!5m2!1sja!2sjp"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </AspectRatio>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

const links = () => {
  return (
    <>
      <Box>
        <Title title="各種リンク" />
        <Box pl="10px">
          <UnorderedList>
            <ListItem>
              <Link href="https://www.elegaku.com/" color="teal.500" isExternal>
                HP：エレガンス学院 <ExternalLinkIcon mx="2px" />
              </Link>
            </ListItem>
            <ListItem>
              <Link href="https://twitter.com/elegaku" color="teal.500" isExternal>
                Twitter：【公式】川崎 エレガンス学院 <ExternalLinkIcon mx="2px" />
              </Link>
            </ListItem>
            <ListItem>
              <Link href="https://twitter.com/eregaku_bot" color="teal.500" isExternal>
                Twitter：【非公式】エレガンス学院出勤情報通知 <ExternalLinkIcon mx="2px" />
              </Link>
            </ListItem>
            <ListItem>
              <Link href="https://twitter.com/n__r__k__t" color="teal.500" isExternal>
                Twitter：作者 <ExternalLinkIcon mx="2px" />
              </Link>
            </ListItem>
          </UnorderedList>
        </Box>
      </Box>
    </>
  );
};
