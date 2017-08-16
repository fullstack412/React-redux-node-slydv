import React from 'react';
import { Link } from 'react-router-dom';
import { Runkit } from './index';

export default function SlideView5() {
  // header + codepane
  return (
    <div>
      <header>header for Title Field or Site Header</header>
      <div id="main">
        <section>section BLURB</section>
        <section>section <Runkit /></section>
        <aside>aside for Optional Speaker Notes</aside>
      </div>
      <footer>footer <Link to="/slideview4">Prev</Link></footer>
    </div>
  );
}
