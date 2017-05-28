import { expect } from 'chai';
import GameOfLife from '../src/components/Chart.js';

describe('Should render svg grid with 16 rects', () => {
    document.body.innerHTML = '<div class="grid"></div>';
    const grid = document.body.querySelectorAll('div')[0];

    it('Div exists in the DOM', () => {
        expect(grid).to.not.equal(null);
    });
    it('Div has calss .grid', () => {
        expect(grid.classList[0]).to.equal('grid');
    });

    const gl = GameOfLife('.grid', { width: 100, height: 100 }, 4);
    const svg = grid.querySelector('svg');
    const g = svg.querySelectorAll('g');
    const rects = g[0].querySelectorAll('rect');

    it('Svg field rendered', () => {
        expect(svg).to.not.equal(null);
    });

    it('Svg field has one g element', () => {
        expect(g.length).to.equal(1);
    });

    it('g element has 16 children', () => {
        expect(rects.length).to.equal(16);
    });
});
