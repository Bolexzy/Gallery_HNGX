import React from "react";
import Image from "next/image";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import imageData from "../data/data";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../components/AuthForm.module.css";

const ImageGallery = () => {
  const imgCount = 11;

  // Create an array with the desired length (10 in this case)

  const [images, setImages] = React.useState(imageData);
  const [loading, setLoading] = React.useState(false);

  const validation = Yup.object().shape({
    search: Yup.string().required("Search is a required field"),
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImages(items);
  };

  const handleLogin = (search) => {
    try {
      setLoading(true);
      const searchTags = imageData.filter((image) => {
        console.log(image.tags?.includes(search));

        return image.tags?.includes(search);
      });

      setImages(searchTags);
    } catch (error) {
      console.error("Search error:", error);
    }
    setLoading(false);
  };

  if (loading)
    return (
      <div class="shadow  rounded-md p-4 w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 bg-slate-100 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-slate-100 rounded col-span-1"></div>
                <div class="h-2 bg-slate-100 rounded col-span-1"></div>
                <div class="h-2 bg-slate-100 rounded col-span-1"></div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-slate-100 rounded col-span-1"></div>
                <div class="h-2 bg-slate-100 rounded col-span-1"></div>
                <div class="h-2 bg-slate-100 rounded col-span-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="p-5 md:p-10 mx-auto">
      <div className="flex md:flex-row justify-between p-4 flex-col">
        <span className="text-xl text-slate-100 font-semibold tracking-widest mb-4">
          DnDGallery
        </span>
        <Formik
          validationSchema={validation}
          initialValues={{ search: "" }}
          onSubmit={(values, { setSubmitting }) => {
            // Alert the input values of the form that we filled
            handleLogin(values.search);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                className="rounded border border-slate-300 p-2 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                type="search"
                name="search"
                id="search"
                placeholder="Search nature, art, animal, car, camp, wolf, moon"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.search}
              />
              {/* If validation is not passed show errors */}
              <p
                className={`${styles.error} italic mb-2 ml-2 my-0 text-left	 text-rose-900	 text-xs`}
              >
                {errors.email && touched.email && errors.email}
              </p>
            </form>
          )}
        </Formik>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="images">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid place-items-center auto-cols-max auto-rows-max gap-x-3 gap-y-2 md:grid-cols-5 sm:grid-cols-3 p-4 m-0"
            >
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      className="shadow-lg shadow-slate-500/50 hover:drop-shadow-xl"
                    >
                      <Image
                        src={`/Assets/images/${image.path}.png`} // Specify the path to the image in the `public` folder
                        alt={"gallery image"}
                        className="image"
                        width={200}
                        height={150}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageGallery;
