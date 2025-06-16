import { createGroupCampaign } from '../actions'
import { redirect } from 'next/navigation'
import Navigation from '@/components/Navigation'

export default function NewCampaign() {
  async function handleSubmit(formData: FormData) {
    'use server'
    
    console.log('Form submitted with data:', Object.fromEntries(formData.entries()))
    
    const result = await createGroupCampaign(formData)
    console.log('Campaign creation result:', result)
    
    if (result.success && result.campaign) {
      redirect(`/campaigns/${result.campaign.id}/pledge`)
    } else {
      // For now, just log the error
      console.error('Failed to create campaign:', result.error)
      // TODO: Show error to user
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create a Campaign</h1>
          
          <form action={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Group Information</h2>
              
              <div>
                <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-1">
                  Group Name
                </label>
                <input
                  type="text"
                  id="groupName"
                  name="groupName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Manchester United Supporters Club"
                  required
                />
              </div>

              <div>
                <label htmlFor="groupEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Group Email
                </label>
                <input
                  type="email"
                  id="groupEmail"
                  name="groupEmail"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="group@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Campaign Details</h2>
              
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Cards for Kids"
                  required
                />
              </div>

              <div>
                <label htmlFor="beneficiary" className="block text-sm font-medium text-gray-700 mb-1">
                  Who is this campaign benefiting?
                </label>
                <input
                  type="text"
                  id="beneficiary"
                  name="beneficiary"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Local Children's Hospital"
                  required
                />
              </div>

              <div>
                <label htmlFor="beneficiaryUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Beneficiary Website (optional)
                </label>
                <input
                  type="url"
                  id="beneficiaryUrl"
                  name="beneficiaryUrl"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Add a link to learn more about the beneficiary organization
                </p>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about your campaign and the cause you're supporting..."
                  required
                />
              </div>

              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">
                  Fundraising Goal ($)
                </label>
                <input
                  type="number"
                  id="goal"
                  name="goal"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="5000"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <a
                href="/"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </a>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create Campaign
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 