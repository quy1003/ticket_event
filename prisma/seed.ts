import { prisma } from '@/lib/prisma'

async function main() {
  console.log('🌱 Seeding database...')

  // Create categories
  const techCategory = await prisma.category.upsert({
    where: { slug: 'technology' },
    update: {},
    create: {
      name: 'Technology',
      slug: 'technology',
    },
  })

  const musicCategory = await prisma.category.upsert({
    where: { slug: 'music' },
    update: {},
    create: {
      name: 'Music',
      slug: 'music',
    },
  })

  const businessCategory = await prisma.category.upsert({
    where: { slug: 'business' },
    update: {},
    create: {
      name: 'Business',
      slug: 'business',
    },
  })

  await prisma.category.upsert({
    where: { slug: 'sports' },
    update: {},
    create: {
      name: 'Sports',
      slug: 'sports',
    },
  })

  // Create tags
  const webTag = await prisma.tag.upsert({
    where: { slug: 'web' },
    update: {},
    create: {
      name: 'Web',
      slug: 'web',
    },
  })

  const aiTag = await prisma.tag.upsert({
    where: { slug: 'ai' },
    update: {},
    create: {
      name: 'AI',
      slug: 'ai',
    },
  })

  const mobileTag = await prisma.tag.upsert({
    where: { slug: 'mobile' },
    update: {},
    create: {
      name: 'Mobile',
      slug: 'mobile',
    },
  })

  // Create users
  const user1 = await prisma.user.upsert({
    where: { email: 'admin@event.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@event.com',
      password: 'hashed_password_admin',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'organizer@event.com' },
    update: {},
    create: {
      name: 'Event Organizer',
      email: 'organizer@event.com',
      password: 'hashed_password_organizer',
    },
  })

  // Create events
  await prisma.event.upsert({
    where: { slug: 'tech-conference-2025' },
    update: {},
    create: {
      title: 'Tech Conference 2025',
      slug: 'tech-conference-2025',
      description: 'Join us for the biggest tech conference of the year with industry leaders.',
      date: new Date('2025-03-15T09:00:00Z'),
      time: '09:00 AM',
      location: 'Hồ Chí Minh City, Vietnam',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
      attendees: 2500,
      price: 500000,
      createdBy: user1.id,
      categories: {
        create: [{ categoryId: techCategory.id }],
      },
      tags: {
        create: [{ tagId: webTag.id }, { tagId: aiTag.id }],
      },
    },
  })

  await prisma.event.upsert({
    where: { slug: 'music-festival-summer' },
    update: {},
    create: {
      title: 'Music Festival Summer',
      slug: 'music-festival-summer',
      description: 'Three days of non-stop music with top artists from around the world.',
      date: new Date('2025-06-20T18:00:00Z'),
      time: '18:00 PM',
      location: 'Da Nang, Vietnam',
      imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=300&fit=crop',
      attendees: 5000,
      price: 250000,
      createdBy: user2.id,
      categories: {
        create: [{ categoryId: musicCategory.id }],
      },
    },
  })

  await prisma.event.upsert({
    where: { slug: 'business-summit-2025' },
    update: {},
    create: {
      title: 'Business Networking Summit',
      slug: 'business-summit-2025',
      description: 'Connect with entrepreneurs, investors, and business leaders.',
      date: new Date('2025-04-10T08:30:00Z'),
      time: '08:30 AM',
      location: 'Hà Nội, Vietnam',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
      attendees: 800,
      price: 750000,
      createdBy: user1.id,
      categories: {
        create: [{ categoryId: businessCategory.id }],
      },
    },
  })

  await prisma.event.upsert({
    where: { slug: 'mobile-dev-bootcamp' },
    update: {},
    create: {
      title: 'Mobile Development Bootcamp',
      slug: 'mobile-dev-bootcamp',
      description: 'Master React Native and Flutter development.',
      date: new Date('2025-05-15T10:00:00Z'),
      time: '10:00 AM',
      location: 'Online',
      attendees: 350,
      price: 0,
      createdBy: user2.id,
      categories: {
        create: [{ categoryId: techCategory.id }],
      },
      tags: {
        create: [{ tagId: mobileTag.id }],
      },
    },
  })

  console.log('✅ Seeding completed successfully!')
  console.log(`\n📊 Created:`)
  console.log(`   • Users: ${[user1.name, user2.name].join(', ')}`)
  console.log(`   • Categories: Technology, Music, Business, Sports`)
  console.log(`   • Tags: Web, AI, Mobile`)
  console.log(`   • Events: 4 sample events`)
  console.log(`\n🎉 Database is ready to use!`)
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
