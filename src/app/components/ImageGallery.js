import React from "react";
import Image from "next/image";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import imageData from "../data/data";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../components/ImageGallery.module.css";

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

        return image.tags?.includes(search.toLowerCase());
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
    <div className="p-5 md:p-10 relative bg-slate-50">
      {/* // style="background-image:linear-gradient(rgba(135, 80, 156, 0.9), rgba(135, 80, 156, 0.9)), url(img/hero-bg.jpg)" */}
      <div className="flex md:flex-row justify-around items-center p-4 flex-col mb-4 w-full">
        <span className="text-xl text-slate-700 font-semibold mb-4 mb-sm-0 tracking-widest">
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
            <form onSubmit={handleSubmit} className="w-6/12">
              <input
                className="rounded border border-slate-300 p-2 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 w-full"
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

      <div className="flex flex-col items-center">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="images">
            {(provided) => (
              <div // ul.images
                {...provided.droppableProps}
                ref={provided.innerRef}
                // className="grid overflow-hidden place-items-center auto-cols-max auto-rows-max gap-x-3 gap-y-2 md:grid-cols-5 sm:grid-cols-3 p-4 m-0"
                className="columns-2 md:columns-3 lg:columns-5 gap-4 max-w-[95%]"
              >
                {images.map((image, index) => (
                  <Draggable
                    key={image.id}
                    draggableId={image.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        className={`${styles.img_card} relative  mb-5`}
                      >
                        {/* card */}
                        <Image
                          src={`/Assets/images/${image.path}.png`} // Specify the path to the image in the `public` folder
                          alt={"gallery image"}
                          className="rounded-2xl w-full h-auto shadow-lg rounded-2xl shadow-slate-500/10 hover:drop-shadow-xl"
                          width={200}
                          height={150}
                        />
                        {/* absolute bottom-100 left-0  right-0*/}
                        <div
                          className={`${styles.img_tags} px-3 transition ease-in-out`}
                          style={
                            {
                              // background:
                              //   "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                            }
                          }
                        >
                          {image.tags.map((tag, index) => (
                            <span
                              className="text-xs italic font-light text-slate-900 mr-3 shadow"
                              key={index}
                            >
                              {`#${tag}`}
                            </span>
                          ))}
                        </div>
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
    </div>
  );
};

export default ImageGallery;
