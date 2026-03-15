import React from "react";

const Explore = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">

      <div className="card ">

        <div className="card-header flex items-center justify-between">
          <h1 className="text-xxl font-semibold">
            Explore Page
          </h1>

         
        </div>

        <div className="card-body">

          <p className="text-slate-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ab distinctio vitae dolore aliquid molestiae porro asperiores
            fuga quos facere ducimus, voluptatum magni sapiente quibusdam
            eveniet dignissimos numquam labore adipisci eligendi.
          </p>

          <div className="mt-6 flex gap-3">
            <button className="btn btn-primary">
              Get Started
            </button>

           
          </div>

        </div>
      </div>

    </div>
  );
};

export default Explore;
