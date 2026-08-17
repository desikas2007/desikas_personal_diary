'use client';

// Original CSS illustration of a cute chibi anime girl — no images, no external assets.
// She sits beside the notebook, one hand gently near her cheek, gazing toward it.
import styles from './AnimeGirl.module.css';

export default function AnimeGirl() {
  return (
    <div className={styles.girlWrap} aria-hidden>
      <div className={styles.girl}>
        <div className={styles.shadow} />

        {/* hair tails (behind the body) */}
        <div className={styles.twintailLeft} />
        <div className={styles.twintailRight} />

        {/* legs peeking out under the dress */}
        <div className={styles.legLeft}>
          <span className={styles.shoeLeft} />
        </div>
        <div className={styles.legRight}>
          <span className={styles.shoeRight} />
        </div>

        {/* arms */}
        <div className={styles.armLeft}>
          <span className={styles.handLeft} />
        </div>
        <div className={styles.armRight}>
          <span className={styles.handRight} />
        </div>

        {/* dress */}
        <div className={styles.body}>
          <span className={styles.collar} />
          <span className={styles.sleeveLeft} />
          <span className={styles.sleeveRight} />
        </div>

        {/* head */}
        <div className={styles.head}>
          <span className={styles.hairCap} />
          <span className={styles.hairShine} />
          <span className={styles.bangs}>
            <i className={styles.bang1} />
            <i className={styles.bang2} />
            <i className={styles.bang3} />
            <i className={styles.bang4} />
          </span>
          <span className={styles.strandLeft} />
          <span className={styles.strandRight} />
          <span className={styles.ribbonLeft} />
          <span className={styles.ribbonRight} />
          <span className={styles.ribbonKnot} />

          <span className={styles.browLeft} />
          <span className={styles.browRight} />
          <span className={styles.eyeLeft}>
            <i className={styles.irisLeft} />
            <i className={styles.eyeSpark} />
          </span>
          <span className={styles.eyeRight}>
            <i className={styles.irisRight} />
            <i className={styles.eyeSparkRight} />
          </span>
          <span className={styles.blushLeft} />
          <span className={styles.blushRight} />
          <span className={styles.mouth} />
        </div>
      </div>
    </div>
  );
}
