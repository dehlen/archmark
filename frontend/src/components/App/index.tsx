import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { IconBrightness } from '@tabler/icons-react';
import {
  ActionIcon,
  Anchor,
  AppShell,
  ColorScheme,
  Container,
  Header,
  Space,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import NewBookmark from '../NewBookmark';
import Search from '../Search';
import ArchivedList from '../ArchivedList';

const App = () => {
  const theme = useMantineTheme();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <Anchor href="/#/" underline={false}>
              <Title order={6} weight={500}>
                home
              </Title>
            </Anchor>
            <Space w="xl" />
            <Anchor href="/#/bookmark" underline={false}>
              <Title order={6} weight={500}>
                add url
              </Title>
            </Anchor>
            <Space w="xl" />
            <Anchor href="/#/deleted" underline={false}>
              <Title order={6} weight={500}>
                deleted
              </Title>
            </Anchor>
            <Space sx={{ flex: 1 }} />
            <ActionIcon onClick={() => toggleColorScheme()}>
              <IconBrightness size="1.125rem" />
            </ActionIcon>
          </div>
        </Header>
      }
    >
      <Container size="lg">
        <Routes>
          <Route index element={<Search />} />
          <Route path="/page/:page" element={<Search />} />
          <Route path="/bookmark" element={<NewBookmark />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/search/:query/page/:page" element={<Search />} />
          <Route path="/deleted" element={<ArchivedList />} />
          <Route path="/deleted/page/:page" element={<ArchivedList />} />
        </Routes>
      </Container>
    </AppShell>
  );
};

export default App;
