import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function ZoomImage({ src, photoWidth, photoHeight, setModalActive }) {
  return (
    <TransformWrapper
      defaultScale={1}
      wheel={{ step: 0.2 }}
      options={{
        limitToBounds: true,
        minScale: 0.5,
        maxScale: 3,
        centerContent: true,
      }}
      zoomIn={{ step: 0.5 }}
      zoomOut={{ step: 0.5 }}
    >
      <TransformComponent>
        <img
          src={src}
          alt="Zoomable"
          className="photo_view_fullscreen_content_image"
          style={
            photoWidth
              ? { width: photoWidth + "px", height: photoHeight + "px" }
              : {}
          }
          onClick={() => setModalActive(false)}
        />
      </TransformComponent>
    </TransformWrapper>
  );
}

export default ZoomImage;
