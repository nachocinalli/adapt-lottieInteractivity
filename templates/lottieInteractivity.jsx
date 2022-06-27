import React from 'react';
import { html, templates } from 'core/js/reactHelpers';

export default function LottieInteractivity(props) {
  const { lottieplayer, description, failed } = props;
  return (
    <div className="component__inner lottieinteractivity__inner">
      <templates.header {...props} />
      {failed && <p className="lottieinteractivity__error">{failed}</p>}
      <div className='component__widget lottieinteractivity__widget'>
        <div dangerouslySetInnerHTML={{ __html: lottieplayer }} />
      </div>
      <div className='lottieinteractivity__description'>
        {html(description)}
      </div>
    </div>
  );
}
