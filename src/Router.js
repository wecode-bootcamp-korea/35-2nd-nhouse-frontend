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
import { NotFound } from './pages/NotFound/NotFound';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Community />} />
        <Route path="/follow" element={<Follow />} />
        <Route path="/card_collections" element={<CardCollections />} />
        <Route path="/card_collections/new" element={<NewFeed />} />
        <Route path="/projects" element={<Projects />} />

        <Route path="/store" element={<Store />} />
        <Route path="/store/category" element={<Category />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
