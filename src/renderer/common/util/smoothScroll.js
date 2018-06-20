/**
 * @file smooth scroll
 * @author leon <ludafa@outlook.com>
 */

import Easing from 'bezier-easing';

export default function scroll(target, from, to, loop = 30) {

    let easing = new Easing(0.2, 0.8, 0.2, 0.8);
    let step = 1;

    function scroll() {

        if (step >= loop) {
            target.scrollTop = to;
            return;
        }

        target.scrollTop = from + (to - from) * easing(step++ / loop);
        requestAnimationFrame(scroll);

    }

    requestAnimationFrame(scroll);

}
