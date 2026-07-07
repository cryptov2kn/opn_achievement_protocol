import { Calendar, Trophy, BadgeCheck, Users } from "lucide-react";

export default function StatsCards() {
  const stats = [
    {
      title: "Events",
      value: 12,
      icon: Calendar,
    },
    {
      title: "Achievements",
      value: 43,
      icon: Trophy,
    },
    {
      title: "Credentials",
      value: 2450,
      icon: BadgeCheck,
    },
    {
      title: "Recipients",
      value: 892,
      icon: Users,
    },
  ];

  return (
    <div
      className="
    grid

    grid-cols-1
    sm:grid-cols-2
    xl:grid-cols-4

    gap-4
  "
    >
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
rounded-3xl

border
border-violet-500/20

bg-zinc-900/60
backdrop-blur-xl

p-2
lg:p-3

min-h-[150px]

flex
flex-col
items-center
justify-center

text-center

transition-all

hover:border-violet-500
hover:-translate-y-1
hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]
"
          >
            <div
              className="
              w-10
              h-10

              lg:w-12
              lg:h-12
              mx-auto
              rounded-2xl
              bg-violet-500/10
              flex items-center justify-center
              "
            >
              <Icon
                className="
                text-violet-400
               w-5
               h-5

               lg:w-6
               lg:h-6
                "
              />
            </div>

            <h2
              className="
              text-2xl
              lg:text-3xl
              font-bold
              mt-3
              lg:mt-4
              "
            >
              {item.value}
            </h2>

            <p
              className="
             mt-2

             text-sm
             lg:text-base

             text-zinc-400
  "
            >
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
