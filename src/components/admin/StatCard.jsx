function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconBg,
  iconColor,
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-800">
            {value}
          </h3>

        </div>


        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          <Icon size={20} />
        </div>

      </div>


      <p className="mt-4 text-xs text-emerald-500">
        {description}
      </p>

    </div>
  );
}

export default StatCard;