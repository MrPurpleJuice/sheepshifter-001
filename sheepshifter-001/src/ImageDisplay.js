import React from 'react';

function ImageDisplay({ data }) {
  return (
    <div>
      <h2>Image Display</h2>
      <div>
        {data.image_urls.map((url, index) => (
          <div key={url} style={{ margin: '10px' }}>
            <img
              src={url}
              alt={data.class_labels[index]}
              width={data.placement_data[index].left + "px"}
              height={data.placement_data[index].top + "px"}
            />
            <p>{data.class_labels[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageDisplay;
