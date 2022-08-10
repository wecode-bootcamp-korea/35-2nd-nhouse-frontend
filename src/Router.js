import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Community } from './pages/Community/Community';
import { Follow } from './pages/Follow/Follow';
import { CardCollections } from './pages/CardCollections/CardCollections';
import { NewFeed } from './pages/NewFeed/NewFeed';
import { Projects } from './pages/Projects/Projects';
import { SignIn } from './pages/SignIn/SignIn';
import { Store } from './pages/Store/Store';
import { Category } from './pages/Category/Category';
import { Nav } from './components/Nav/Nav';
import { SecondNav } from './components/Nav/SecondNav';
import { Detail } from './pages/Detail/Detail';
import { ProductList } from './pages/Category/ProductList';
import { ReadCard } from './pages/ReadCard/ReadCard';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Nav />} />
        <Route path="/card_collections/new" element={<SecondNav />} />
        <Route path="/users/login" element={<SignIn />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Community />} />
        <Route path="/follow" element={<Follow />} />
        <Route path="/card_collections" element={<CardCollections />} />
        <Route path="/card_collections/:id" element={<ReadCard />} />
        <Route path="/card_collections/new" element={<NewFeed />} />
        <Route path="/projects" element={<Projects />} />

        <Route path="/store" element={<Store />} />
        <Route path="/store/:id" element={<Detail />} />
        <Route path="/category" element={<Category />}>
          <Route path="" element={<ProductList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
