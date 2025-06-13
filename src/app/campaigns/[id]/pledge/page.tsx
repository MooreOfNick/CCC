import { prisma } from '@/lib/prisma'
import { createPledge } from '../../actions'
import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'

export default async function PledgePage({ params }: { params: { id: string } }) {
  const campaign = await prisma.campaign.findUnique({
    where: { id: params.id },
    include: { group: true },
  })

  if (!campaign) {
    notFound()
  }

  async function handleSubmit(formData: FormData) {
    'use server'
    
    const result = await createPledge(formData, params.id)
    if (result.success) {
      redirect(`/campaigns/${params.id}/thank-you`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Join the Campaign</h1>
            <p className="mt-2 text-gray-600">
              {campaign.title} by {campaign.group.name}
            </p>
          </div>
          
          <form action={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Information</h2>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Pledge Amounts</h2>
              
              <div>
                <label htmlFor="yellowCardRate" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount per Yellow Card ($)
                </label>
                <input
                  type="number"
                  id="yellowCardRate"
                  name="yellowCardRate"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="10"
                  required
                />
              </div>

              <div>
                <label htmlFor="redCardRate" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount per Red Card ($)
                </label>
                <input
                  type="number"
                  id="redCardRate"
                  name="redCardRate"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="50"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAnonymous"
                  name="isAnonymous"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isAnonymous" className="ml-2 block text-sm text-gray-700">
                  Keep my pledge anonymous
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <a
                href={`/campaigns/${params.id}`}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </a>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Make Pledge
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 